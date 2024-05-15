export const appRoutes = {
  home: '/',
  auth: '/auth',
  register: '/admin/register',
  login: '/login',
  admin: {
    profile: '/profile/admin',
    staff: '/profile/admin/all-staff',
    positions: '/profile/admin/positions',
  },
  employee: {
    profile: '/profile/employee',
  },
  notFound: '*',
};

export const httpRoutes = {
  users: 'staff',
  newUser: 'staff/register-user',
  sessions: 'staff/sessions',
  positions: 'positions',
  newPosition: 'positions/new-position',
};
