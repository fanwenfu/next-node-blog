import { inject, observer } from 'mobx-react'
import Link from 'next/link'
import React from 'react'
import { IStore } from '../stores/store'
import { Clock } from './Clock'
import { Button, Switch } from "antd";

interface IOwnProps {
  store?: IStore
  title: string
  linkTo: string
}

@inject("store")
@observer
class SampleComponent extends React.Component<IOwnProps> {
  state = {
    loading: false,
    iconLoading: false
  };
  public componentDidMount() {
    if (!this.props.store) {
      return;
    }
    this.props.store.start();
  }

  public componentWillUnmount() {
    if (!this.props.store) {
      return;
    }
    this.props.store.stop();
  }
  onChange() {}
  enterLoading = () => {
    // this.setState({ loading: true });
    this.props.store.add()
  };
  public render() {
    if (!this.props.store) {
      return <div>Store not defined</div>;
    }
    return (
      <div>
        <h1>{this.props.title}</h1>
        <Clock
          lastUpdate={this.props.store.lastUpdate}
          light={this.props.store.light}
        />
        <nav>
          <Link href={this.props.linkTo}>
            <a>Navigate</a>
          </Link>
        </nav>
        <Button
          type="primary"
          loading={this.state.loading}
          onClick={this.enterLoading}
        >
          Click me!
        </Button>
        <div>{this.props.store.count}</div>
        <Switch defaultChecked onChange={this.onChange} />
      </div>
    );
  }
}

export { SampleComponent }
