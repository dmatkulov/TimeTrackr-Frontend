export const appRoutes = {
  home: '/',
  auth: '/auth',
  register: '/admin/register',
  login: '/login',
  admin: {
    profile: '/admin',
    staff: '/admin/all-staff',
    positions: '/admin/positions',
    staffInfo: '/admin/all-staff/profile',
    stats: '/admin/stats',
  },
  employee: {
    profile: '/profile',
    profileInfo: '/profile/info',
    today: '/profile/today',
    calendar: '/profile/calendar',
  },
  notFound: '*',
};

export const apiRoutes = {
  users: 'staff',
  userInfo: 'staff/info/',
  newUser: 'staff/register-user',
  sessions: 'staff/sessions',
  positions: 'positions',
  newPosition: 'positions/new-position',
  positionById: 'positions/info/',
  editPosition: 'positions/edit/',
  deletePositions: 'positions/delete',
  deleteUser: 'staff/delete/',
  updateUser: 'staff/edit',
};
