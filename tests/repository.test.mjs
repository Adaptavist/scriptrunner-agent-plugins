// Guards the invariants that decide whether the plugin installs: both
// marketplaces list the same plugins under the same name, and each plugin's
// Claude Code and Codex manifests agree.

import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { describe, test } from 'node:test'
import { fileURLToPath } from 'node:url'

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const readJson = (...parts) => JSON.parse(readFileSync(join(repoRoot, ...parts), 'utf8'))
const marketplace = readJson('.claude-plugin', 'marketplace.json')
const codexMarketplace = readJson('.agents', 'plugins', 'marketplace.json')

const pluginDirs = readdirSync(join(repoRoot, 'plugins'), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)

describe('marketplace manifest', () => {
  test('lists every plugin directory, and only those', () => {
    assert.deepEqual(
      marketplace.plugins.map((plugin) => plugin.name).sort(),
      [...pluginDirs].sort(),
      'plugins/ and marketplace.json have drifted — an unlisted plugin is not installable',
    )
  })

  test('points each entry at its own directory', () => {
    for (const plugin of marketplace.plugins) {
      assert.equal(plugin.source, `./plugins/${plugin.name}`, `${plugin.name}: source does not match its name`)
    }
  })

  test('declares an owner and a description', () => {
    assert.ok(marketplace.owner?.name, 'marketplace.owner.name is required')
    assert.ok(marketplace.description?.length > 20, 'marketplace.description is too thin to be useful')
  })

  test('Codex manifest shares the marketplace name and lists the same plugins', () => {
    // `<plugin>@<marketplace>` has to be the same string on both hosts.
    assert.equal(codexMarketplace.name, marketplace.name, 'Codex and Claude marketplace names have drifted')
    assert.deepEqual(
      codexMarketplace.plugins.map((plugin) => plugin.name).sort(),
      marketplace.plugins.map((plugin) => plugin.name).sort(),
      '.agents/plugins/marketplace.json and .claude-plugin/marketplace.json list different plugins',
    )
    for (const plugin of codexMarketplace.plugins) {
      assert.deepEqual(
        plugin.source,
        { source: 'local', path: `./plugins/${plugin.name}` },
        `${plugin.name}: Codex source does not match its name`,
      )
      assert.ok(
        plugin.policy?.installation && plugin.policy?.authentication && plugin.category,
        `${plugin.name}: a Codex entry needs policy.installation, policy.authentication, and category`,
      )
    }
  })
})

describe('plugin manifests', () => {
  for (const name of pluginDirs) {
    describe(name, () => {
      const manifest = readJson('plugins', name, '.claude-plugin', 'plugin.json')

      test('manifest name matches its directory', () => {
        assert.equal(manifest.name, name)
      })

      test('version is major.minor.patch', () => {
        assert.match(manifest.version, /^\d+\.\d+\.\d+$/)
      })

      test('Claude and Codex manifests have the same version', () => {
        const codex = readJson('plugins', name, '.codex-plugin', 'plugin.json')
        assert.equal(codex.name, manifest.name)
        assert.equal(codex.version, manifest.version)
      })
    })
  }
})
