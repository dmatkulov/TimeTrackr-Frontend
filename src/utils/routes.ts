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

export const apiRoutes = {
  users: 'staff',
  newUser: 'staff/register-user',
  sessions: 'staff/sessions',
  positions: 'positions',
  positionById: 'positions/info/',
  editPosition: 'positions/edit/',
  newPosition: 'positions/new-position',
};
