import React, { Component } from 'react';
import moment from 'moment';
import MonthChart from './MonthChart';
import { numberToCurrency } from '../utils/helpers';
import { Card, InputNumber, Form, Input, Select, Col, Row } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;

class MortgageCalculator extends Component {
  monthsSinceStart(year, month) {
    const today = new Date();
    const startDate = moment([year, month, 1]);
    const endDate = moment([
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    ]);
    return Math.abs(startDate.diff(endDate, 'months', true).toFixed());
  }

  setAndUpdateState = state => {
    this.props.updateState(state);
  };

  handleLoanBalanceChange = e => {
    this.setAndUpdateState({ loanBalance: parseInt(e, 10) });
  };

  handleCurrentBalanceChange = e => {
    this.setAndUpdateState({ currentBalance: parseInt(e, 10) });
  };

  handleInterestRateChange = interestRate => {
    this.setAndUpdateState({ interestRate });
  };

  handleYearChange = e => {
    this.setAndUpdateState({ startYear: parseInt(e, 10) });
  };

  handleMonthChange = e => {
    this.setAndUpdateState({ startMonth: parseInt(e, 10) });
  };

  handleYearTermChange = e => {
    this.setAndUpdateState({ yearTerm: parseInt(e, 10) });
  };

  handleExtraMonthlyPaymentChange = e => {
    this.setAndUpdateState({ extraMonthlyPayment: parseFloat(e) });
  };

  pmt(interest, payments, presentValue) {
    const exponent = (interest + 1.0) ** payments;
    const topLine = interest * exponent;
    const bottomLine = exponent - 1.0;
    return presentValue * (topLine / bottomLine);
  }

  render() {
    const {
      currentYear,
      startYear,
      loanBalance,
      startMonth,
      interestRate,
      yearTerm,
      currentBalance,
      extraMonthlyPayment,
    } = this.props;
    const years = [...Array(yearTerm).keys()];

    const interest = interestRate / 100.0 / 12;
    const monthlyPayment = this.pmt(
      interest,
      12 * yearTerm,
      loanBalance
    ).toFixed(2);
    const completedMonths = this.monthsSinceStart(startYear, startMonth);
    const totalMonths = 12 * yearTerm;

    const firstMonthInterest = parseFloat(
      (currentBalance * interest).toFixed(2)
    );
    const firstMonthPrincipal = monthlyPayment - firstMonthInterest;

    let cv = currentBalance;
    const _months = [...Array(totalMonths).keys()].map((month, i) => {
      const pastMonth = i < completedMonths;
      let _principal = 0.0;
      let _interest = 0.0;
      let _balance = cv;

      if (i === completedMonths) {
        _principal = firstMonthPrincipal + extraMonthlyPayment;
        _interest = firstMonthInterest;
        _balance = cv - _principal;
        cv = _balance;
      } else if (i > completedMonths) {
        _interest = parseFloat((cv * interest).toFixed(2));
        _principal = monthlyPayment - _interest + extraMonthlyPayment;
        _balance = cv - _principal;
        cv = _balance;
      }

      const early = Math.max(_balance, 0) === 0;
      return {
        pastMonth,
        principal: _principal,
        interest: _interest,
        balance: Math.max(_balance, 0),
        early,
      };
    });

    const earlyMonths = _months.filter(m => m.early).length;

    return (
      <Row className="space-around">
        <Col span={18} offset={3}>
          <div className="header-row">
            <h3>Mortgage Calculator</h3>
          </div>
          <div className="body-row">
            <div className="App">
              <div className="App-intro">
                <Row>
                  <div className="formRow">
                    <Col span={11}>
                      <Card title="Loan Details">
                        <Row>
                          <Col span={10}>
                            <FormItem label="Original Balance">
                              <InputNumber
                                defaultValue={loanBalance}
                                max={10000000}
                                min={1000}
                                step={1000}
                                formatter={value =>
                                  `$ ${value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ','
                                  )}
                                parser={value =>
                                  value.replace(/\$\s?|(,*)/g, '')}
                                onChange={this.handleLoanBalanceChange}
                              />
                            </FormItem>
                          </Col>
                          <Col span={10} offset={1}>
                            <FormItem label="Current Balance">
                              <InputNumber
                                defaultValue={currentBalance}
                                max={loanBalance}
                                min={1000}
                                step={1000}
                                formatter={value =>
                                  `$ ${value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ','
                                  )}
                                parser={value =>
                                  value.replace(/\$\s?|(,*)/g, '')}
                                onChange={this.handleCurrentBalanceChange}
                              />
                            </FormItem>
                          </Col>
                        </Row>

                        <Row>
                          <Col span={6}>
                            <FormItem label="Interest Rate">
                              <InputNumber
                                defaultValue={interestRate}
                                min={0}
                                max={100}
                                step={0.1}
                                formatter={value => `${value}%`}
                                parser={value => value.replace('%', '')}
                                onChange={this.handleInterestRateChange}
                              />
                            </FormItem>
                          </Col>
                          <Col span={10} offset={1}>
                            <FormItem label="Loan Term">
                              <Select
                                size="large"
                                defaultValue={String(yearTerm)}
                                onChange={this.handleYearTermChange}
                                style={{ width: '120px' }}
                              >
                                {[...Array(30).keys()].map(y => {
                                  const year = String(y + 1);
                                  return (
                                    <Option key={y} value={year}>
                                      {year} {year === 1 ? 'year' : 'years'}
                                    </Option>
                                  );
                                })}
                              </Select>
                            </FormItem>
                          </Col>
                        </Row>

                        <FormItem label="Origin Date">
                          <Row>
                            <Col span={6}>
                              <Select
                                size="large"
                                defaultValue={String(startMonth)}
                                onChange={this.handleMonthChange}
                                style={{ width: '100%' }}
                              >
                                {moment.months().map((m, i) => {
                                  return (
                                    <Option value={String(i + 1)} key={i}>
                                      {m}
                                    </Option>
                                  );
                                })}
                              </Select>
                            </Col>
                            <Col span={4} offset={1}>
                              <Select
                                size="large"
                                defaultValue={String(startYear)}
                                onChange={this.handleYearChange}
                                style={{ width: '100%' }}
                              >
                                {years.map(y => {
                                  const year = String(currentYear - y);
                                  return (
                                    <Option key={y} value={year}>
                                      {year}
                                    </Option>
                                  );
                                })}
                              </Select>
                            </Col>
                          </Row>
                        </FormItem>
                      </Card>
                    </Col>
                    <Col span={11} offset={2}>
                      <Card title="Extra Payments">
                        <Row>
                          <Col span={6}>
                            <FormItem label="Monthly">
                              <InputNumber
                                defaultValue={extraMonthlyPayment}
                                min={0}
                                step={100}
                                formatter={value =>
                                  `$ ${value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ','
                                  )}
                                parser={value =>
                                  value.replace(/\$\s?|(,*)/g, '')}
                                onChange={this.handleExtraMonthlyPaymentChange}
                              />
                            </FormItem>
                          </Col>
                        </Row>
                      </Card>
                      <br />
                      <br />

                      <Card
                        title={`${totalMonths} Month Mortgage - ${numberToCurrency(
                          monthlyPayment
                        )}/month`}
                      >
                        <div className="text-center">
                          Completed <b>{completedMonths}</b> out of{' '}
                          <b>
                            {totalMonths -
                              completedMonths -
                              earlyMonths +
                              completedMonths}
                          </b>{' '}
                          monthly payments
                          <br />
                          <b>
                            {totalMonths - completedMonths - earlyMonths}
                          </b>{' '}
                          monthly payments remain.
                        </div>
                      </Card>
                    </Col>
                  </div>
                </Row>
                <br />
                <br />

                <MonthChart
                  months={_months}
                  startYear={startYear}
                  startMonth={startMonth}
                />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}

export default MortgageCalculator;
