import fs from 'fs';
import path from 'path';

export function modifyFilePlugin(options) {
  return {
    name: 'modify-file-plugin',

    async writeBundle(outputOptions, bundle) {
      const filePath = path.resolve(options.filePath);

      try {
        // Читаем содержимое файла
        let fileContents = await fs.promises.readFile(filePath, 'utf-8');

        const countCommit = require('child_process')
          .execSync('git rev-list HEAD --count')
          .toString()
          .trim();
        const branchName = require('child_process')
          .execSync('git branch --show-current')
          .toString()
          .trim();
        const cacheName = `cache_${branchName}_${countCommit}`;

        // Вносим изменения в содержимое файла:
        if (options.developmentMode) {
          fileContents = fileContents.replace('const PROD_MODE = true', 'const PROD_MODE = false');
        }
        fileContents = fileContents.replace(options.search, cacheName);

        // Записываем измененное содержимое обратно в файл
        await fs.promises.writeFile(filePath, fileContents, 'utf-8');

        console.log(`Файл ${filePath} успешно обработан и изменен.`);
      } catch (error) {
        console.error(`Произошла ошибка при обработке файла ${filePath}:, ${error}`);
      }
    },
  };
}
