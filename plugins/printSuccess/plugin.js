const { green, blue } = require('kleur')

module.exports = {
  async apply(value, previousValues) {
    return new Promise(resolve => {
      console.log('\n')
      console.log(
        'TheCodingMachine React-Native windowFilms initialized with success ! 🚀\n',
      )
      console.log(
        `${green(
          '                                                                    .-`    `::  \n' +
            ' `/////////////     `/shhhy+-   ://.        /sy/                   /ss/   :NMN: \n' +
            ' `sssssyhhhyhhy:` `yMMMMNNMMMd. osss:     `hMMMh-    .-`         `+ss:   +MMm/. \n' +
            '      :MMM+----. `mMMm+:-`.oo/` osssyo`  `dMMMMh-   ohhh-       `oyy+-  sMMd/.  \n' +
            '      :MMM+`     oMMN/-         osssyhs`.mMMMMMh-   -hds`      .syy+- `hMMh:`   \n' +
            '      :MMM+`     hMMd:          oss-ohhhMMMhdMMh-    `.       +NNm/. .dMMy:`    \n' +
            '      :MMM+`     oMMN/          oss-`shdMMd:dMMh-    :-`     sMMd/. -NMMo-      \n' +
            '      :MMM+`     `mMMm/`  `/+:. oss- `sdMd:.hMMh-   hMys-  `hMMh:` -hdy-`       \n' +
            '      :MMM+`      `yMMMMdssss+  oss.  `oh/- hMMh-   -hyo:  dMMs:` -ss+`         \n' +
            '      .oys:`        .+yhyo/-    -::`    ``  -syo-     ..`  +mo-   `//           \n' +
            '        ``             ```                    ``            `.                  ',
        )}`,
      )
      if (previousValues.typescript) {
        console.log(blue('THE TYPESCRIPT VERSION 📘'))
      }
      console.log('\n')

      console.log(
        '- 📚 If you need to read more about this windowfilms : https://thecodingmachine.github.io/react-native-windowfilms/',
      )
      console.log(
        '- 🤕 If you have some troubles : https://github.com/thecodingmachine/react-native-windowfilms/issues',
      )
      console.log(
        '- ⭐ If you love this windowfilms, give us a star, you will be a ray of sunshine in our lives :) https://github.com/thecodingmachine/react-native-windowfilms',
      )
      resolve()
    })
  },
}
