import test from 'node:test';
import assert from 'node:assert/strict';
import { validateContactForm, generateTransmissionId } from './validation';
import { parseAndExecuteCommand } from './terminalParser';

test('validateContactForm rejects empty payload', () => {
  const result = validateContactForm({});
  assert.equal(result.isValid, false);
  assert.ok(result.errors.name);
  assert.ok(result.errors.email);
  assert.ok(result.errors.subject);
  assert.ok(result.errors.message);
});

test('validateContactForm rejects invalid email formats', () => {
  const result = validateContactForm({
    name: 'Ada Lovelace',
    email: 'not-an-email',
    subject: 'Project Inquiry',
    message: 'Hello, looking forward to discussing your systems architecture work.'
  });
  assert.equal(result.isValid, false);
  assert.ok(result.errors.email);
});

test('validateContactForm accepts valid complete inputs', () => {
  const result = validateContactForm({
    name: 'DevOps Lead',
    email: 'lead@infra.example.com',
    subject: 'Sentinel Net Inquiry',
    message: 'We are very impressed by the endpoint monitoring project and would like to connect.'
  });
  assert.equal(result.isValid, true);
  assert.deepEqual(result.errors, {});
});

test('generateTransmissionId produces expected TX- format', () => {
  const id1 = generateTransmissionId();
  const id2 = generateTransmissionId();
  assert.match(id1, /^TX-[A-F0-9]{6}-[A-Z0-9]+$/);
  assert.notEqual(id1, id2);
});

test('parseAndExecuteCommand responds to help command', () => {
  const res = parseAndExecuteCommand('help');
  assert.ok(res.output.includes('Available Terminal Commands'));
  assert.ok(res.output.includes('sentinel'));
});

test('parseAndExecuteCommand handles theme change', () => {
  const res = parseAndExecuteCommand('theme amber');
  assert.equal(res.action, 'set_theme');
  assert.equal(res.themeArg, 'amber');
});

test('parseAndExecuteCommand executes ping simulation', () => {
  const res = parseAndExecuteCommand('ping google.com');
  assert.ok(res.output.includes('PING google.com'));
  assert.ok(res.output.includes('0.0% packet loss'));
});
