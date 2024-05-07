export const appRoutes = {
  home: '/',
  register: '/admin/register',
  login: '/login',
  profile: '/profile',
  adminProfile: '/profile/admin',
  userProfile: '/profile/user',
  staff: '/profile/admin/all-staff',
  notFound: '*',
};

export const httpRoutes = {
  users: 'staff',
  login: 'staff/sessions',
  positions: 'positions',
};
