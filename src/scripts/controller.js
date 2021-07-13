export default class Controller {
  constructor(cssModel, optionsModel, view) {
    this.cssModel = cssModel;
    this.view = view;
    this.optionsModel = optionsModel;
    
    this.createNewStyleElement(this.cssModel.newCss);
    this.addInitialOptionsClasses(this.optionsModel.options);
    this.createInitOptionsItems(this.optionsModel.options);
    this.view.bindToggleOption(this.handleToggleOption);
  }
  
  createNewStyleElement = (css) => {
    this.view.createStyleElement(css);
  }
  
  addInitialOptionsClasses = (options) => {
    this.view.addInitialOptionsClasses(options);
  }
  
  createInitOptionsItems = (options) => {
    this.view.createOptionsItems(options);
  }
  
  handleToggleOption = (option, action) => {
    if (action === 'enable') {
      this.optionsModel.enableOption(option);
    } else {
      this.optionsModel.disableOption(option);
    }
  }
}