import * as React from 'react';
import styles from './Portal.module.scss';
import { IPortalProps, dynmiclinks, IJsonArray, IJsonMap, linksitems } from './IPortalProps';
import { service } from './logic'
import { boundMethod } from 'autobind-decorator';
import { SPHttpClientResponse } from '@microsoft/sp-http';
require('../../assets/css/webpage1.css');

export default class Portal extends React.Component<IPortalProps, dynmiclinks> {
  private service: service;
  public constructor(props: IPortalProps) {
    super(props);
    this.service = new service(this.props.context);
    this.state = {
      config: [
        { title: '', links: '', sn: '', img: '' },
        { title: '', links: '', sn: '', img: '' },
        { title: '', links: '', sn: '', img: '' },
        { title: '', links: '', sn: '', img: '' },
        { title: '', links: '', sn: '', img: '' },
        { title: '', links: '', sn: '', img: '' },
        { title: '', links: '', sn: '', img: '' },
        { title: '', links: '', sn: '', img: '' },
        { title: '', links: '', sn: '', img: '' },
        { title: '', links: '', sn: '', img: '' },
        { title: '', links: '', sn: '', img: '' },
        { title: '', links: '', sn: '', img: '' },
        { title: '', links: '', sn: '', img: '' },
        { title: '', links: '', sn: '', img: '' },
        { title: '', links: '', sn: '', img: '' },
        { title: '', links: '', sn: '', img: '' },
        { title: '', links: '', sn: '', img: '' },
        { title: '', links: '', sn: '', img: '' },
        { title: '', links: '', sn: '', img: '' },
        { title: '', links: '', sn: '', img: '' },
        { title: '', links: '', sn: '', img: '' }
      ]
    };
  }
  public componentDidMount(): void {
    this._bindlinks();
  }
  public render(): React.ReactElement<IPortalProps> {
    return (
      <div>
        <div className={styles.header_bg} style={{backgroundImage: `url(${this.props.backgroundImage})`}}>
          <div className={'container-fluid'}>
            <div className={'row'}>
              <div className={'col-12 col-md-5'}>
                <div className={'ps-5 mt-5'}> <img src={this.props.logo} />
                  <div className={'mt-5'}>
                    {this.props.heading === 'Text' ?
                      <h1 className={'text-white'}>{this.props.headingvalue}</h1>
                      : ''
                    }
                    {this.props.heading === 'Logo' ?
                      <img className={'mt-5'} src={this.props.headingvalue} />
                      : ''
                    }
                    <h6 className={'text-white mt-3'}>We have created this website to host all the material you would need as a distributor to promote the brands.</h6>
                  </div>
                </div>
              </div>
              <div className={'col-12 col-md-3'}></div>
              <div className={'col-12 col-md-4'}>
                <div className={'mt-5 pe-5'}>
                    {/*
                  <div className={'pt-l-5 bg-top text-white text-center'}>
                    <p>  Welcome to Your Dedicated Portal</p><br />
                    <p>Scroll Down to Find<br />
                      the Right <br />Material For You!</p>
                    <p className={'mt-3'}>
                    </p>
                  </div>
                  */}
                </div>
              </div>
            </div>
          </div>
          <div className={'service'}>
            <div className={'p-3 bg-color'}></div>
            <div className={'container-fluid'}>
              <div className={'row'}>
                <div className={'col-12'}>
                  <ul className={'list-inline text-white text-center m-0 pt-5 pb-5'}>
                    <a href={this.state.config[0].links}><li className={'list-inline-item'}><img src={this.state.config[0].img} /><br />
                    <h5 className={'mt-3'}>{this.state.config[0].title} </h5>
                    </li></a>
                    <a href={this.state.config[1].links}><li className={'list-inline-item'}><img src={this.state.config[1].img} /><br />
                    <h5 className={'mt-3'}>{this.state.config[1].title} </h5>
                    </li></a>
                    <a href={this.state.config[2].links}><li className={'list-inline-item'}><img src={this.state.config[2].img} /><br />
                    <h5 className={'mt-3'}>{this.state.config[2].title} </h5>
                    </li></a>
                    <a href={this.state.config[3].links}><li className={'list-inline-item'}><img src={this.state.config[3].img} /><br />
                      <h5 className={'mt-3'}>{this.state.config[3].title} </h5>
                    </li></a>
                    <a href={this.state.config[4].links}><li className={'list-inline-item'}><img src={this.state.config[4].img} /><br />
                      <h5 className={'mt-3'}>{this.state.config[4].title} </h5>
                    </li></a>
                    <a href={this.state.config[5].links}><li className={'list-inline-item'}><img src={this.state.config[5].img} /><br />
                      <h5 className={'mt-3'}>{this.state.config[5].title} </h5>
                    </li></a>
                    <a href={this.state.config[6].links}><li className={'list-inline-item'}><img src={this.state.config[6].img} /><br />
                      <h5 className={'mt-3'}>{this.state.config[6].title}</h5>
                    </li></a>

                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
  @boundMethod
  private _bindlinks(): void {
    const listname: string = this.props.listname;
    const columns: string = 'Id,Title,Header,Links,SN,Imgpath';
    this.service.getListItem('', listname, '', columns, '', '', '')
      .then((response: SPHttpClientResponse) => {
        response.json().then((data: any) => {
          console.log(data);
          let title: string = '';
          let link: string = '';
          let sn: string = '';
          let imgpath: string = '';
          let config: linksitems[] = [];
          const nextprojectData: IJsonArray = data.value as IJsonArray;
          nextprojectData.forEach((item: IJsonMap) => {
            title = item.Header as string;
            link = item.Links as string;
            sn = item.SN as string;
            imgpath = item.Imgpath as string;
            config.push({ title: title, links: link, sn: sn, img: imgpath });

          });
          this.setState({ config: config });
        });
      })
  }
}
