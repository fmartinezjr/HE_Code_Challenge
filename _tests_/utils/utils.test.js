const { getRepoURL, getPropertyInformation } = require("../../app/utils/utils.js");

describe('calculateCustomerRate', () => {

 const URL = getRepoURL("https://github.com/npm/cli");

    describe('when valid url is passed', ()=>{

        it('should return formated url', ()=>{

            expect(URL).toContain("https://api.github.com/repos/npm/cli");

          })
    });

});


describe('getPropertyInformation', () => {


  const pullRequests = 
  [
    {
      url: 'https://api.github.com/repos/Bacon/BaconQrCode/pulls/73',
      id: 477760529,
      number: 73,
      state: 'open',
      locked: false,
      title: 'New option for Encoder to define a QR code version number',
      user: {
        login: 'Clayton',
        id: 5267726,
      },
      commits_url: 'https://api.github.com/repos/Bacon/BaconQrCode/pulls/73/commits',
      review_comments_url: 'https://api.github.com/repos/Bacon/BaconQrCode/pulls/73/comments',
      review_comment_url: 'https://api.github.com/repos/Bacon/BaconQrCode/pulls/comments{/number}',
      comments_url: 'https://api.github.com/repos/Bacon/BaconQrCode/issues/73/comments',
    }
  ]

 
     describe('when user key is passed as parameter', ()=>{

      const Title = getPropertyInformation(pullRequests, "title" );
 
         it('should return title information', ()=>{
 
             expect(Title).toEqual(["New option for Encoder to define a QR code version number"]);
 
           })
     });


     describe('when login key is passed as parameter', ()=>{

      const User = getPropertyInformation(pullRequests, "login" );
 
         it('should return user information', ()=>{
 
             expect(User).toEqual(["Clayton"]);
 
           })
     });

     describe('when comments url key is passed as parameter', ()=>{

      const CommentsUrl = getPropertyInformation(pullRequests, "comments_url" );
 
         it('should return comments url', ()=>{
 
             expect(CommentsUrl).toEqual(["https://api.github.com/repos/Bacon/BaconQrCode/issues/73/comments"]);
 
           })
     });

     describe('when commits url key is passed as parameter', ()=>{

      const CommitsUrl = getPropertyInformation(pullRequests, "commits_url" );
 
         it('should return commits url', ()=>{
 
             expect(CommitsUrl).toEqual(["https://api.github.com/repos/Bacon/BaconQrCode/pulls/73/commits"]);
 
           })
     });
 
 });



 