import React from "react";
import { Drawer, Button, Row } from 'antd';
import BookList from "./BookList";
import {CalendarOutlined} from '@ant-design/icons';

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
            <h4 style={{marginLeft: '5px', marginBottom: '0'}}>
                <CalendarOutlined style={{marginRight: 5}} />Upcoming
                <Button
                    type="link"
                    onClick={this.showDrawer}
                    style={{
                        padding: '0',
                        paddingLeft: '15px',
                        lineHeight: 'inherit',
                        height: 'inherit',
                        fontSize: '12px'
                    }}
                >
                    View all
                    {/*{books.length} Upcoming <DoubleRightOutlined />*/}
                </Button>
            </h4>
          <Drawer
              title={`Upcoming Books (${books.length})`}
              placement="bottom"
              closable
              onClose={this.onClose}
              visible={this.state.visible}
              height={515}
          >
              <Row>
                  <BookList books={books} />
              </Row>
          </Drawer>
        </div>
    );
  }
}

export default UpcomingBooks;
