export type StructuredErrors =
  // SQL
  'sql/failed' |
  'sql/not-found' |

  // Crud
  'validation/failed' |

  // Authorization
  'auth/missing-header' |
  'auth/bad-header' |
  'auth/invalid-jwt' |
  'auth/unknown-email' |

  // Mailer |
  'mailer/unknown' |

  // SSH
  'ssh/bad-information' |

  // Default
  'internal/unknown'
;
