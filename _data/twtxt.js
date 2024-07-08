module.exports = function () {
    const nickname = 'tom';
    const twtxtUrl = 'https://tomcasavant.com/twtxt.txt';

    const posts = [
        `2024-07-08T13:50:00Z\t/nick ${nickname}`,
        `2024-07-08T13:51:00Z\t/twturl ${twtxtUrl}`,
        `2024-07-08T14:18:30-04:00\tHello world, this is your captain speaking`,
    ];

    const twtxtContent = posts.join('\n');

    return {
      content: twtxtContent,
    };
};
