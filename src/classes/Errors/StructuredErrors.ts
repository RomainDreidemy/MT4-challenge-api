export type StructuredErrors =
  // SQL
  'sql/failed' |
  'sql/not-found' |

  // Crud
  'validation/failed' |

  // Authorization
  'auth/missing-header' |
  'auth/unknown-email' |

  // Mailer |
  'mailer/unknown' |

  // Default
  'internal/unknown'
;
