import React from "react";
import { Drawer, Button } from 'antd';
import BookList from "./BookList";
import {DoubleRightOutlined} from '@ant-design/icons';

class UpcomingBooks extends React.Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { books } = this.props;

    return (
        <div>
          <Button type="default" onClick={this.showDrawer}>
            {books.length} Upcoming <DoubleRightOutlined />
          </Button>
          <Drawer
              title={`Upcoming Books (${books.length})`}
              placement="bottom"
              closable
              onClose={this.onClose}
              visible={this.state.visible}
              height={515}
          >
            <BookList books={books} />
          </Drawer>
        </div>
    );
  }
}

export default UpcomingBooks;
