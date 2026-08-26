---
name: csv-streaming-transformer
description: Autonomous memory-safe streaming CSV parser and transformer for Claude Code. Auto-detects delimiters (comma, semicolon, tab), streams large gigabyte datasets in constant memory, and maps records into structured JSON.
---

# CSV Streaming Transformer Skill

Empowers autonomous Claude Code agents to process, filter, and transform massive CSV tabular datasets without running out of Node.js memory heap.

## Features
- **Delimiter Auto-Detection**: Heuristically detects commas, semicolons, tabs, and pipes.
- **Escaped Quote Parsing**: Robust handling of RFC 4180 quotes, multiline values, and commas within fields.
- **Constant Memory Streaming**: Processes row-by-row chunks without loading the entire file into RAM.