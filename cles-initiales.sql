-- 10 clés d'accès initiales (seules les empreintes SHA-256 sont stockées).
-- À coller dans Supabase > SQL Editor APRÈS schema.sql, puis Run.
insert into public.access_keys (key_hash, label) values
  ('cb32149a23187c07d39b1089f2b5eec6795febdadbeebcc66945e456a594a301', 'Clé 01 — 2026-10-21'),
  ('1e0a77f5eff01840b70e41d3c1461ebfedbc63ae9f8d97aa66090c35f760495c', 'Clé 02 — 2026-10-21'),
  ('ade02ee7ba9c0cefeea633a602571694a63fa3babecd1856d816f163a0eb8d1a', 'Clé 03 — 2026-10-21'),
  ('36aaadf916c4decb23c0d09b9b4981165a84ef4ec73d9c3472ee6339e313bc1b', 'Clé 04 — 2026-10-21'),
  ('df93b82862b2e2e490ab717da31948956e3347f83dbb70f568efdccb9c47308c', 'Clé 05 — 2026-10-21'),
  ('b0a82b874ec22bed8fb9efc0e2d9ce6a1c5280b77e01b4c1352edc03ff700da2', 'Clé 06 — 2026-10-21'),
  ('f970c25177247c8315283a6b62138e583654bce5bdcb34d90d1f53bb86b2287d', 'Clé 07 — 2026-10-21'),
  ('d4537dc6760b013daf898283c8b16882d8620c2a859fc65aa5c7e97d4befc0b0', 'Clé 08 — 2026-10-21'),
  ('ea218ec18d390910e44d0ad5e4b4f3e0a439868c7c238a0bcdbc5adff1604723', 'Clé 09 — 2026-10-21'),
  ('02ae45ec83490d97a78f7e666c539e4f0001b5bf81c98401c5b392dc14fc4de2', 'Clé 10 — 2026-10-21');
