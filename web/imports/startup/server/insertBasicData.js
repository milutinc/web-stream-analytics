// Fill the DB with example data on startup
import '/imports/lib/collections';

const insertBasicData = () => {
  console.log(` ${moment().format('DD.MM.YYYY HH:mm:ss')} > Insert Basic Data Start`);
  // if the Links collection is empty
  if (Links.find().count() === 0) {
    console.log(` ${moment().format('DD.MM.YYYY HH:mm:ss')} >   Insert Links`);
    const data = [
      {
        title: 'Do the Tutorial',
        url: 'https://www.meteor.com/try',
        createdAt: new Date(),
      },
      {
        title: 'Follow the Guide',
        url: 'http://guide.meteor.com',
        createdAt: new Date(),
      },
      {
        title: 'Read the Docs',
        url: 'https://docs.meteor.com',
        createdAt: new Date(),
      },
      {
        title: 'Discussions',
        url: 'https://forums.meteor.com',
        createdAt: new Date(),
      },
    ];
    data.forEach(link => Links.insert(link));
  }
  console.log(` ${moment().format('DD.MM.YYYY HH:mm:ss')} > Insert Basic Data End`);
};

export { insertBasicData };
