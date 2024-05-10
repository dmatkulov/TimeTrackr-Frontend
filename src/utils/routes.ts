export const appRoutes = {
  home: '/',
  auth: '/auth',
  register: '/admin/register',
  login: '/login',
  profile: '/profile',
  staff: '/profile/admin/all-staff',
  positions: '/profile/admin/positions',
  notFound: '*',
};

export const httpRoutes = {
  users: 'staff',
  sessions: 'staff/sessions',
  positions: 'positions',
};
