export const appRoutes = {
  home: '/',
  register: '/admin/register',
  login: '/login',
  profile: '/profile',
  adminProfile: '/profile/admin',
  userProfile: '/profile/user',
  staff: '/profile/admin/all-staff',
  positions: '/profile/admin/positions',
  notFound: '*',
};

export const httpRoutes = {
  users: 'staff',
  sessions: 'staff/sessions',
  positions: 'positions',
};
