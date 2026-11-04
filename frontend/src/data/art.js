// Illustrated environment paintings (hand-painted gouache style, generated per-environment).
export const ART = {
  journal: "/art/journal-room.jpg",
  page: "/art/journal-page.jpg",
  playground: "/art/playground.jpg",
  school: "/art/school-corridor.jpg",
  library: "/art/library-interior.jpg",
  college: "/art/college-campus.jpg",
  du: "/art/du-campus.jpg",
  mba: "/art/mba-campus.jpg",
  classroom: "/art/bschool-classroom.jpg",
  apartment: "/art/apartment-room.jpg",
  kolkata: "/art/kolkata-street.jpg",
  supermarket: "/art/supermarket-aisle.jpg",
  npd: "/art/npd-studio.jpg",
  stage: "/art/fest-stage.jpg",
  mumbai: "/art/mumbai-street.jpg",
  packaging: "/art/packaging-studio.jpg",
  control: "/art/control-room.jpg",
  bizroom: "/art/biz-command-room.jpg",
  teamroom: "/art/team-room.jpg",
  crossroads: "/art/crossroads.jpg",
  archive: "/art/archive-hall.jpg",
};

export const preload = (urls) =>
  urls.forEach((u) => {
    const i = new Image();
    i.src = u;
  });
