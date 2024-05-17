export const appRoutes = {
  home: '/',
  auth: '/auth',
  register: '/admin/register',
  login: '/login',
  admin: {
    profile: '/profile/admin',
    staff: '/profile/admin/all-staff',
    positions: '/profile/admin/positions',
    staffInfo: '/profile/admin/all-staff/profile',
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
  newPosition: 'positions/new-position',
  positionById: 'positions/info/',
  editPosition: 'positions/edit/',
  deletePositions: 'positions/delete',
};
