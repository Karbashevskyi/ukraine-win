import {SourceEnum} from '@app/common/enums/source.enum';

export const environment = {
  host: {
    [SourceEnum.GITHUB]: 'https://raw.githubusercontent.com/Karbashevskyi/ukraine-win/main'
  },
  production: true
};
