import assert from 'node:assert/strict'
import test from 'node:test'

import { extractGitHubRepoSlug } from './repoSlug.ts'

test('keeps owner/repo input as-is', () => {
  assert.equal(extractGitHubRepoSlug('AffHub/freecoding'), 'AffHub/freecoding')
})

test('extracts slug from https GitHub URLs', () => {
  assert.equal(
    extractGitHubRepoSlug('https://github.com/evoluindocomia/affhub-freecoding'),
    'AffHub/freecoding',
  )
  assert.equal(
    extractGitHubRepoSlug('https://www.github.com/AffHub/freecoding.git'),
    'AffHub/freecoding',
  )
})

test('extracts slug from ssh GitHub URLs', () => {
  assert.equal(
    extractGitHubRepoSlug('git@github.com:AffHub/freecoding.git'),
    'AffHub/freecoding',
  )
  assert.equal(
    extractGitHubRepoSlug('ssh://git@github.com/AffHub/freecoding'),
    'AffHub/freecoding',
  )
})

test('rejects malformed or non-GitHub URLs', () => {
  assert.equal(extractGitHubRepoSlug('https://gitlab.com/AffHub/freecoding'), null)
  assert.equal(extractGitHubRepoSlug('https://github.com/AffHub'), null)
  assert.equal(extractGitHubRepoSlug('not actually github.com/AffHub/freecoding'), null)
  assert.equal(
    extractGitHubRepoSlug('https://evil.example/?next=github.com/AffHub/freecoding'),
    null,
  )
  assert.equal(
    extractGitHubRepoSlug('https://github.com.evil.example/AffHub/freecoding'),
    null,
  )
  assert.equal(
    extractGitHubRepoSlug('https://example.com/github.com/AffHub/freecoding'),
    null,
  )
})
