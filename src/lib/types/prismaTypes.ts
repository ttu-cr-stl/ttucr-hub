import { Prisma, User, Event, Org } from "@prisma/client";

export type UserWithOrgsAndEvents = Prisma.UserGetPayload<{
  include: {
    orgs: true;
    EventAttendance: {
      include: {
        Event: true;
      };
    };
  };
}>;

export type ExtendedUser = UserWithOrgsAndEvents & {
  events: Event[];
};