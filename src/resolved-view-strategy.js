import {ViewManager} from './view-manager';
import {viewStrategy, ViewEngine, ViewCompileInstruction, ResourceLoadContext, ViewFactory} from 'aurelia-templating';
import {relativeToFile} from 'aurelia-path';
/**
* A view strategy that loads a view based on namespace and view name registered with the ViewManager
*/
@viewStrategy()
export class ResolvedViewStrategy {
  /**
  * Creates an instance of ResolvedViewStrategy.
  * @param namespace The namespace of the view.
  * @param view The name of the view.
  */
  constructor(namespace: string, view: string) {
    this.namespace = namespace;
    this.view = view;
  }

  /**
  * Loads a view factory.
  * @param viewEngine The view engine to use during the load process.
  * @param compileInstruction Additional instructions to use during compilation of the view.
  * @param loadContext The loading context used for loading all resources and dependencies.
  * @return A promise for the view factory that is produced by this strategy.
  */
  loadViewFactory(viewEngine: ViewEngine, compileInstruction: ViewCompileInstruction, loadContext?: ResourceLoadContext): Promise<ViewFactory> {
    let viewManager = viewEngine.container.get(ViewManager);
    let path        = viewManager.resolve(this.namespace, this.view);

    compileInstruction.associatedModuleId = this.moduleId;

    return viewEngine.loadViewFactory(this.moduleId ? relativeToFile(path, this.moduleId) : path, compileInstruction, loadContext);
  }
}
