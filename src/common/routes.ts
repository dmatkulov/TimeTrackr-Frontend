export const appRoutes = {
  home: '/',
  redirect: '/redirect',
  auth: '/Auth',
  admin: {
    profile: '/admin',
    staff: '/admin/all-staff',
    positions: '/admin/positions',
    staffInfo: '/admin/all-staff/profile',
    stats: '/admin/stats',
  },
  user: {
    profile: '/profile',
    account: '/profile/info',
    dashboard: '/profile/dashboard',
    calendar: '/profile/calendar',
    notes: '/profile/notes',
    teams: '/profile/teams',
    projects: '/profile/projects',
  },
  notFound: '*',
};

export const authUrl = {
  register: 'Auth/register',
  login: 'Auth/login',
  logout: 'Auth/logout',
  googleLogin: 'Auth/google',
};

export const userUrl = {
  user: 'user/info/',
  updateUser: 'user/edit/',
  deleteUser: 'user/delete/',
  updatePhoto: 'user/photo/edit/',
};

export const positionUrl = {
  positions: 'positions',
  newPosition: 'positions/new-position',
  positionById: 'positions/info/',
  editPosition: 'positions/edit/',
  deletePositions: 'positions/delete',
};
