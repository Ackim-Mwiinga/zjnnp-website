// User roles with hierarchical permissions
const ROLES = {
  ADMIN: 'admin',
  EDITOR: 'editor',
  REVIEWER: 'reviewer',
  PUBLISHER: 'publisher',
  AUTHOR: 'author',
  READER: 'reader'
};

// Role hierarchy (lower number means higher permission)
const ROLE_HIERARCHY = {
  [ROLES.ADMIN]: 1,
  [ROLES.EDITOR]: 2,
  [ROLES.PUBLISHER]: 3,
  [ROLES.REVIEWER]: 4,
  [ROLES.AUTHOR]: 5,
  [ROLES.READER]: 6
};

// Role-specific permissions
const PERMISSIONS = {
  [ROLES.ADMIN]: [
    'manage_users',
    'manage_roles',
    'manage_content',
    'manage_settings',
    'publish_articles'
  ],
  [ROLES.EDITOR]: [
    'edit_articles',
    'assign_reviewers',
    'manage_issues',
    'publish_articles'
  ],
  [ROLES.PUBLISHER]: [
    'publish_articles',
    'manage_issues',
    'view_analytics'
  ],
  [ROLES.REVIEWER]: [
    'review_articles',
    'submit_reviews'
  ],
  [ROLES.AUTHOR]: [
    'submit_articles',
    'edit_own_articles'
  ],
  [ROLES.READER]: [
    'read_articles',
    'download_articles'
  ]
};

// List of all valid roles
const USER_ROLES = Object.values(ROLES);

// Role inheritance - defines which roles can access which other roles' resources
const ROLE_INHERITANCE = {
  [ROLES.ADMIN]: [ROLES.EDITOR, ROLES.PUBLISHER, ROLES.REVIEWER, ROLES.AUTHOR, ROLES.READER],
  [ROLES.EDITOR]: [ROLES.REVIEWER, ROLES.AUTHOR, ROLES.READER],
  [ROLES.PUBLISHER]: [ROLES.AUTHOR, ROLES.READER],
  [ROLES.REVIEWER]: [ROLES.READER],
  [ROLES.AUTHOR]: [ROLES.READER],
  [ROLES.READER]: []
};

// Helper function to check if a user has a specific role
const hasRole = (user, requiredRole) => {
  if (!user?.role) return false;
  if (user.role === requiredRole) return true;
  return ROLE_INHERITANCE[user.role]?.includes(requiredRole) || false;
};

// Helper function to check if a user has a specific permission
const hasPermission = (user, requiredPermission) => {
  if (!user?.role) return false;
  
  // Admin has all permissions
  if (user.role === ROLES.ADMIN) return true;
  
  // Check direct permissions
  const permissions = PERMISSIONS[user.role] || [];
  return permissions.includes(requiredPermission) || 
         permissions.includes('*');
};

module.exports = {
  ROLES,
  ROLE_HIERARCHY,
  PERMISSIONS,
  USER_ROLES,
  ROLE_INHERITANCE,
  hasRole,
  hasPermission
};
