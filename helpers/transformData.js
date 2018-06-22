function transformData(sessions, speakers, event, sponsors, tracksData, roomsData, reqOpts, next) {
  fold.foldByTrack(sessions, speakers, tracksData, reqOpts, function(tracks) {
    const days = fold.foldByDate(tracks);
    const sociallinks = fold.createSocialLinks(event);

    fold.extractEventUrls(event, speakers, sponsors, reqOpts, function(eventurls) {
      const copyright = fold.getCopyrightData(event);

      fold.foldByLevel(sponsors, reqOpts, function(sponsorpics) {
        const roomsinfo = fold.foldByRooms(roomsData, sessions, speakers, tracksData);

        fold.foldBySpeakers(speakers, sessions, tracksData, reqOpts, function(speakerslist) {
          const apptitle = fold.getAppName(event);
          const timeList = fold.foldByTime(sessions, speakers, tracksData);
          const metaauthor = fold.getOrganizerName(event);
          const tracknames = fold.returnTracknames(sessions, tracksData);
          const roomsnames = fold.returnRoomnames(roomsinfo);

	// Data object used by template engine: { eventurls, roomsinfo, apptitle, timeList, metaauthor, tracknames, roomsnames }

          next({
            eventurls, roomsinfo, apptitle, timeList, metaauthor, tracknames, roomsnames
          });
        });
      });
    });
  });
}
