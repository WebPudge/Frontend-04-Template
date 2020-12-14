var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    // Next, add your custom code
    // this.option('babel'); // This method adds support for a `--babel` flag
  }
  async initPackage() {
    const answers = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.appname, // Default to current folder name
      },
    ]);

    const pkgJSON = {
      name: answers.name,
      version: '1.0.0',
      description: '',
      main: 'src/main.js',
      scripts: {
        test: 'echo "Error: no test specified" && exit 1',
      },
      author: '',
      license: 'ISC',
      dependencies: {},
      devDependencies: {},
    };
    this.fs.extendJSON(this.destinationPath('package.json'), pkgJSON);

    this.npmInstall(['vue'], { 'save-dev': false });
    this.npmInstall(
      [
        'webpack',
        'webpack-cli',
        'copy-webpack-plugin',
        'vue-loader',
        'vue-template-compiler',
        'vue-style-loader',
        'css-loader',
      ],
      {
        'save-dev': true,
      }
    );

    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('src/index.html'),
      { title: answers.name }
    );
    this.fs.copyTpl(
      this.templatePath('Hello.vue'),
      this.destinationPath('src/Hello.vue')
    );
    this.fs.copyTpl(
      this.templatePath('main.js'),
      this.destinationPath('src/main.js')
    );
    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js')
    );
  }
};
