---
name: rag-knowledge-indexer
description: Autonomous semantic text chunker and vector embedding indexer for Claude Code. Splits markdown/source files into sliding context chunks and calculates Cosine Similarity in pure JavaScript.
---

# RAG Knowledge Indexer Skill

Enables Claude Code agents to index local documentation repositories, compute lexical/vector representations, and query embeddings using pure JavaScript cosine similarity.

## Features
- **Semantic Text Chunker**: Overlapping sliding window chunking preserving header hierarchy.
- **Pure JS Cosine Similarity**: In-memory vector dot-product scoring without external vector DB dependencies.
- **Top-K Retrieval**: Fast ranking and extraction of relevant knowledge contexts.