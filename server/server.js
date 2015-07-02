Meteor.startup(function() {
  Accounts.onCreateUser(function (options, user) {
    // As in the default onCreateUser(), copy options.profile
    // into user.profile.
    if (options.profile) {
      user.profile = options.profile;
    }

    // Now, if this is the first user (which is to say, if there are
    // no users created yet), do some initial app setup work.
    if (Meteor.users.find().count() === 0) {
      console.log('--------------------------');
      console.log('this is the first user!');

      if (Teams.find().count() === 0) {
        var teamId = Teams.insert({
          name: 'public'
        });
        console.log('--------------------------');
        console.log('inserted the default team.');

        console.log('User the user with id : '+ user._id);
        Channels.insert({
          name: 'general',
          teamId: teamId,
          createdBy: user._id,
          timestamp: new Date()
        });
        console.log('--------------------------');
        console.log('inserted the default channel by the administrator.');
      }

    }

    // Return the user, so that they can be finally actually created.
    return user;
  });

});
