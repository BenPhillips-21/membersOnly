**Project: Members Only**

'Members Only' is designed to provide a secure and exclusive platform for users to join and interact within a private community. Users can sign up, create messages, join the club with a secret passcode, and enjoy various features tailored to their membership status. This project was completed as part of 'The Odin Project' online coding curriculum, specifically the Node.js course.

**Link to website:** https://membersonly-production-0e79.up.railway.app/

**Features**
    User Authentication:
        Users can sign up with a username and password.
        Passwords are securely hashed using bcrypt for enhanced security.

    Membership System:
        Users are not automatically granted full membership status upon signing up.
        To become a Premium member, users must enter a secret passcode provided by the club.
        Once the passcode is entered correctly, the user's membership status is updated.

    Login System:
        User authentication is implemented using Passport.js for secure login functionality.
        Only registered users can access the platform.

    Message Creation:
        Authenticated users can create messages with a title, timestamp, and text.
        Messages are associated with the user who created them.

    Message Display:
        All member messages are displayed on the home page.
        Author names and dates are hidden from non-members to maintain privacy.
        Only club members can view the complete details of each message.

    Admin Privileges:
        An optional "Admin" field is available in the user model.
        Users marked as admins have additional privileges, such as deleting messages.
        Admin-specific features are accessible only to users with admin status.
