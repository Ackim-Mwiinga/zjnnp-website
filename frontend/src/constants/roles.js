// Define user roles
export const ROLES = {
  ADMIN: 'admin',
  EDITOR: 'editor',
  REVIEWER: 'reviewer',
  AUTHOR: 'author',
  READER: 'reader'
};

// Define role hierarchy (lower number means higher permission)
export const ROLE_HIERARCHY = {
  [ROLES.ADMIN]: 1,
  [ROLES.EDITOR]: 2,
  [ROLES.REVIEWER]: 3,
  [ROLES.AUTHOR]: 4,
  [ROLES.READER]: 5
};

// Define role-specific permissions
export const PERMISSIONS = {
  [ROLES.ADMIN]: [
    'manage_users',
    'manage_roles',
    'manage_content',
    'manage_settings'
  ],
  [ROLES.EDITOR]: [
    'edit_articles',
    'assign_reviewers',
    'manage_issues'
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

// Helper function to check if a user has a specific role
export const hasRole = (user, requiredRole) => {
  if (!user?.role) return false;
  return user.role === requiredRole;
};

// Helper function to check if a user has sufficient permission
export const hasPermission = (user, requiredPermission) => {
  if (!user?.role) return false;
  
  // Check if user's role has the required permission
  return PERMISSIONS[user.role]?.includes(requiredPermission);
};

// Helper function to check if user has higher or equal role
export const hasHigherOrEqualRole = (user, requiredRole) => {
  if (!user?.role) return false;
  
  const userRoleLevel = ROLE_HIERARCHY[user.role];
  const requiredRoleLevel = ROLE_HIERARCHY[requiredRole];
  
  return userRoleLevel <= requiredRoleLevel;
};