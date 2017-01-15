import React from 'react';
import showcase from '../../assets/images/showcase-sm.png';
import slider1  from '../../assets/images/slider-1.jpg';
import saving   from '../../assets/images/Saving.png';
import charity  from '../../assets/images/Charity.png';
import debts    from '../../assets/images/Debts.png';
import {title} from '../../utils/helpers';

import {Carousel,Row, Col} from 'antd';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    title('');
  }

  render() {
    return (
      <div>
        <Row type="flex" justify="center" align="center">
          <Col span={24}>
            <Carousel>
              <div>
                <img src={slider1} />
                <div className='slider-text'>
                  <h2>Budgetal</h2>
                  <span>
                    Take control of your finances and save<br />
                    for the future. Get started today with our<br />
                    easy-to-use budgeting software.
                  </span>
                </div>
              </div>
            </Carousel>
          </Col>
        </Row>

        <Row type="flex" align="center" className="space-around">
          <Col span={24} >
            <Row className="marketing-row space-around">
              <Col span={6} offset={2} className='space-around'>
                <div className='text-center'>
                  <img src={saving} />
                  <h4>Saving</h4>
                </div>
                <p>
                  Saving money will help you plan for expenses,
                  chase away emergencies, and begin building wealth.
                  Tell your money where to go instead of wondering
                  where it went.
                </p>
              </Col>
              <Col span={6} offset={1} className='space-around'>
                <div className='text-center'>
                  <img src={charity} />
                  <h4>Generosity</h4>
                </div>
                <p>
                  Saving and producing wealth for its own sake
                  can lead to a selfish and self-centered life.
                  While you're building wealth,
                  don't stop being generous, give even more.
                </p>
              </Col>
              <Col span={6} offset={1} className='space-around'>
                <div className='text-center'>
                  <img src={debts} />
                  <h4>Freedom</h4>
                </div>
                <p>
                  The fastest way to build wealth is to be debt free.
                  Having no debts means you have no payments. No
                  payments means you have money. Money enables you
                  give and build wealth.
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}
