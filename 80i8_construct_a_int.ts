interface HTMLNode {
  nodeName: string;
  attributes: { [key: string]: string };
  children: HTMLNode[];
}

interface Rule {
  selector: string;
  action: (node: HTMLNode) => void;
}

interface ParserConfig {
  rules: Rule[];
  rootHTML: string;
}

class Parser {
  private config: ParserConfig;
  private htmlNodeTree: HTMLNode;

  constructor(config: ParserConfig) {
    this.config = config;
    this.htmlNodeTree = this.parseHTML(config.rootHTML);
  }

  private parseHTML(html: string): HTMLNode {
    // implement HTML parsing logic here
    return {
      nodeName: 'div',
      attributes: {},
      children: []
    };
  }

  public parse(): void {
    this.config.rules.forEach(rule => {
      this.traverse(this.htmlNodeTree, rule);
    });
  }

  private traverse(node: HTMLNode, rule: Rule): void {
    if (node.nodeName === rule.selector) {
      rule.action(node);
    }
    node.children.forEach(child => this.traverse(child, rule));
  }
}

const parserConfig: ParserConfig = {
  rules: [
    {
      selector: 'h1',
      action: node => console.log(`Found h1: ${node.nodeName}`)
    },
    {
      selector: 'p',
      action: node => console.log(`Found p: ${node.nodeName}`)
    }
  ],
  rootHTML: '<html><body><h1>Hello</h1><p>World!</p></body></html>'
};

const parser = new Parser(parserConfig);
parser.parse();