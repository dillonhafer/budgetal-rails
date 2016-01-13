import React from 'react';
import showcase from '../../assets/images/showcase-sm.png';
import saving   from '../../assets/images/Saving.png';
import charity  from '../../assets/images/Charity.png';
import debts    from '../../assets/images/Debts.png';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className='row home-intro'>
          <div className='large-8 medium-8 columns'>
            <div><img src={showcase} /></div>
          </div>
          <div className='large-4 medium-4 columns'>
            <h1>Budgetal</h1>
            <p>Take control of your finances and prepare for your future. Get started today with our easy-to-use, zero-sum budgeting software. All for free!</p>
          </div>
        </div>
        <section className='start-today'>
          <div className="row collapse">
            <div className="large-12 columns text-center">
              <h4>Budgetal gives you tools to help</h4>
            </div>
          </div>
        </section>

        <section id="main-content">
          <div className="row centered-text marketing-row">
            <div className="medium-4 large-4 columns">
              <div className='text-center'>
                 <img src={saving} />
                <h4>Plan for Saving</h4>
              </div>
              <p className='text-center'>Start saving.</p>
              <p>
                Saving money will help you plan for expenses,
                chase away emergencies, and begin building wealth.
                Tell your money where to go instead of wondering
                where it went.
              </p>
            </div>
            <div className="medium-4 large-4 columns">
              <div className='text-center'>
                 <img src={charity} />
                <h4>Give to Others</h4>
              </div>
              <p className='text-center'>Become generous.</p>
              <p>
                Saving and producing wealth for its own sake
                can lead to a selfish and self-centered life.
                While you're building wealth,
                don't stop being generous, give even more.
              </p>
            </div>
            <div className="medium-4 large-4 columns">
              <div className='text-center'>
                 <img src={debts} />
                <h4>Enjoy your Freedom</h4>
              </div>
              <p className='text-center'>Erase debt.</p>
              <p>
                The fastest way to build wealth is to be debt free.
                Having no debts means you have no payments. No
                payments means you have money. Money enables you
                give and build wealth.
              </p>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
