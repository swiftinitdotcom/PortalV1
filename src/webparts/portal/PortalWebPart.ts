import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'PortalWebPartStrings';
import Portal from './components/Portal';
import { IPortalProps } from './components/IPortalProps';
import { SPComponentLoader } from '@microsoft/sp-loader';
SPComponentLoader.loadCss('https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css');
SPComponentLoader.loadScript('https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js');



export interface IPortalWebPartProps {
  description: string;
  listname: string;
  logo: string;
  backgroundImage: string;
  heading:string;
  headingvalue:string;
}

export default class PortalWebPart extends BaseClientSideWebPart<IPortalWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPortalProps > = React.createElement(
      Portal,
      {
        description: this.properties.description,
        context: this.context,
        listname: this.properties.listname,
        logo: this.properties.logo,
        backgroundImage: this.properties.backgroundImage,
        heading: this.properties.heading,
        headingvalue:this.properties.headingvalue
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: 'Configurations'
          },
          groups: [
            {
              groupName: '',
              groupFields: [
                PropertyPaneTextField('listname', {
                  label: 'List Name'
                }),
                PropertyPaneTextField('logo', {
                  label: 'Logo',
                  description: 'Provide main logo url'
                }),
                PropertyPaneTextField('backgroundImage', {
                  label: 'Background Image',
                  description: 'Provide background image url'
                }),
                PropertyPaneTextField('heading', {
                  label: 'Heading(Text or Logo)',
                  description: 'Enter Text or Logo'
                }),
                PropertyPaneTextField('headingvalue', {
                  label: 'Heading Value',
                  description: 'Provide Img Url or Text to display in heading.'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
