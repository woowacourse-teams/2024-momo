/* eslint-disable no-undef */

const { TextDecoder, TextEncoder } = require('node:util');
const { ReadableStream } = require('node:stream/web');

if (globalThis.ReadableStream === undefined) {
  globalThis.ReadableStream = ReadableStream;
}

Object.defineProperties(globalThis, {
  TextDecoder: { value: TextDecoder },
  TextEncoder: { value: TextEncoder },
});

const { Blob, File } = require('node:buffer');
const { fetch, Headers, FormData, Request, Response } = require('undici');

Object.defineProperties(globalThis, {
  fetch: { value: fetch, writable: true },
  Blob: { value: Blob },
  File: { value: File },
  Headers: { value: Headers },
  FormData: { value: FormData },
  Request: { value: Request },
  Response: { value: Response },
});
