export const appRoutes = {
  home: '/',
  redirect: '/redirect',
  auth: '/auth',
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
  google: 'staff/google',
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
  tasks: 'tasks',
  createTask: 'tasks/new-task',
  deleteTask: 'tasks/delete',
  getTask: 'tasks/info',
  editTask: 'tasks/edit/',
};
