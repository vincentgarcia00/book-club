import React from "react";
import { Drawer, Button, Icon } from 'antd';
import BookList from "./BookList";

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
            View {books.length} Upcoming Book{books.length === 1 ? '' : 's'}<Icon type="double-right" />
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
