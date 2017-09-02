import React from 'react';
import { title } from '../../utils/helpers';
import { Col, Row, Anchor, BackTop } from 'antd';

export default class Privacy extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    title('Privacy');
  }

  render() {
    return (
      <Row className="space-around">
        <Col span={18} offset={3}>
          <BackTop />
          <div className="header-row">
            <h3>Privacy Policy</h3>
          </div>
          <div className="body-row">
            <Row>
              <Col md={6} xs={0} sm={0}>
                <Anchor>
                  <Anchor.Link href="#logo" title="Privacy Policy" />
                  <Anchor.Link
                    href="#collection"
                    title="Information Collection"
                  />
                  <Anchor.Link
                    href="#information-usage"
                    title="Information Usage"
                  />
                  <Anchor.Link
                    href="#information-protection"
                    title="Information Protection"
                  />
                  <Anchor.Link href="#cookie-usage" title="Cookie Usage" />
                  <Anchor.Link
                    href="#third-p-disc"
                    title="3rd Party Disclosure"
                  />
                  <Anchor.Link href="#third-p-links" title="3rd Party Links" />
                  <Anchor.Link href="#g-adsense" title="Google AdSense" />
                  <Anchor.Link href="#caloppa" title="CalOPPA" />
                  <Anchor.Link href="#coppa" title="COPPA" />
                  <Anchor.Link
                    href="#fair-info"
                    title="Fair Information Practices"
                  />
                  <Anchor.Link href="#can-spam" title="CAN-SPAM" />
                  <Anchor.Link
                    href="#contact"
                    title="Our Contact Information"
                  />
                </Anchor>
              </Col>
              <Col md={18} xs={24} sm={24}>
                <div id="ppBody">
                  <div className="innerText">
                    <strong>Privacy Policy</strong> <br /> <br /> This privacy
                    policy has been compiled to better serve those who are
                    concerned with how their 'Personally identifiable
                    information' (PII) is being used online. PII, as used in US
                    privacy law and information security, is information that
                    can be used on its own or with other information to
                    identify, contact, or locate a single person, or to identify
                    an individual in context. Please read our privacy policy
                    carefully to get a clear understanding of how we collect,
                    use, protect or otherwise handle your Personally
                    Identifiable Information in accordance with our website.{' '}
                    <br />{' '}
                  </div>{' '}
                  <span id="infoCo" /> <br />{' '}
                  <div className="grayText">
                    <a id="collection" />
                    <strong data-magellan-destination="collection">
                      What personal information do we collect from the people
                      that visit our blog, website or app?
                    </strong>
                  </div>
                  <br />
                  <div className="innerText">
                    When ordering or registering on our site, as appropriate,
                    you may be asked to enter your Name, Email address or other
                    details to help you with your experience.
                  </div>
                  <br />
                  <div className="grayText">
                    <strong>When do we collect information?</strong>
                  </div>
                  <br />
                  <div className="innerText">
                    We collect information from you when you register on our
                    site or enter information on our site.
                  </div>
                  <br />
                  <span id="infoUs" />
                  <br />
                  <div className="grayText">
                    <a id="information-usage" />
                    <strong data-magellan-destination="information-usage">
                      How do we use your information?{' '}
                    </strong>
                  </div>
                  <br />
                  <div className="innerText">
                    We may use the information we collect from you when you
                    register, make a purchase, sign up for our newsletter,
                    respond to a survey or marketing communication, surf the
                    website, or use certain other site features in the following
                    ways:
                    <br />
                    <br />
                  </div>
                  <div className="innerText">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>&bull;</strong> To
                    personalize user's experience and to allow us to deliver the
                    type of content and product offerings in which you are most
                    interested.
                  </div>
                  <div className="innerText">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>&bull;</strong> To
                    send periodic emails regarding your order or other products
                    and services.
                  </div>
                  <span id="infoPro" />
                  <br />
                  <div className="grayText">
                    <strong data-magellan-destination="information-protection">
                      How do we protect visitor information?
                    </strong>
                    <a id="information-protection" />
                  </div>
                  <br />
                  <div className="innerText">
                    Our website is scanned on a regular basis for security holes
                    and known vulnerabilities in order to make your visit to our
                    site as safe as possible.
                    <br />
                    <br />
                  </div>
                  <div className="innerText">
                    Your personal information is contained behind secured
                    networks and is only accessible by a limited number of
                    persons who have special access rights to such systems, and
                    are required to keep the information confidential. In
                    addition, all sensitive/credit information you supply is
                    encrypted via Secure Socket Layer (SSL) technology.
                  </div>
                  <br />
                  <div className="innerText">
                    We implement a variety of security measures enters, submits,
                    or accesses their information<div className="innerText">
                      All transactions are processed through a gateway provider
                      and are not stored or processed on our servers.
                    </div>
                    <span id="coUs" />
                    <br />
                    <div className="grayText">
                      <a id="cookie-usage" />
                      <strong data-magellan-destination="cookie-usage">
                        Do we use 'cookies'?
                      </strong>
                    </div>
                    <br />
                    <div className="innerText">No.</div>
                    <br />
                    <span id="trDi" />
                    <br />
                    <div className="grayText">
                      <a id="third-p-disc" />
                      <strong data-magellan-destination="third-p-disc">
                        Third Party Disclosure
                      </strong>
                    </div>
                    <br />
                    <div className="innerText">
                      No, we do not sell, trade, or otherwise transfer to
                      outside parties your personally identifiable information.
                    </div>
                    <span id="trLi" />
                    <br />
                    <div className="grayText">
                      <a id="third-p-links" />
                      <strong data-magellan-destination="third-p-links">
                        Third party links
                      </strong>
                    </div>
                    <br />
                    <div className="innerText">
                      We do not include or offer third party products or
                      services on our website.
                    </div>
                    <span id="gooAd" />
                    <br />
                    <div className="blueText">
                      <a id="g-adsense" />
                      <strong data-magellan-destination="g-adsense">
                        Google
                      </strong>
                    </div>
                    <br />
                    <div className="innerText">
                      Google's advertising requirements can be summed up by
                      Google's Advertising Principles. They are put in place to
                      provide a positive experience for users.{' '}
                      <a
                        href="https://support.google.com/adwordspolicy/answer/1316548?hl=en"
                        target="_blank"
                      >
                        AdwordsPolicy
                      </a>
                      <br />
                      <br />
                    </div>
                    <div className="innerText">
                      We have not enabled Google AdSense on our site but we may
                      do so in the future.
                    </div>
                    <span id="calOppa" />
                    <br />
                    <div className="blueText">
                      <a id="caloppa" />
                      <strong data-magellan-destination="caloppa">
                        California Online Privacy Protection Act
                      </strong>
                    </div>
                    <br />
                    <div className="innerText">
                      CalOPPA is the first state law in the nation to require
                      commercial websites and online services to post a privacy
                      policy. The law's reach stretches well beyond California
                      to require a person or company in the United States (and
                      conceivably the world) that operates websites collecting
                      personally identifiable information from California
                      consumers to post a conspicuous privacy policy on its
                      website stating exactly the information being collected
                      and those individuals with whom it is being shared, and to
                      comply with this policy.
                      <br />
                    </div>
                    <div className="innerText">
                      <br />
                      <strong>
                        According to CalOPPA we agree to the following:
                      </strong>
                    </div>
                    <div className="innerText">
                      Users can visit our site anonymously
                    </div>
                    <div className="innerText">
                      Once this privacy policy is created, we will add a link to
                      it on our home page, or as a minimum on the first
                      significant page after entering our website.
                    </div>
                    <div className="innerText">
                      Our Privacy Policy link includes the word 'Privacy', and
                      can be easily be found on the page specified above.
                    </div>
                    <div className="innerText">
                      <br />Users will be notified of any privacy policy
                      changes:
                    </div>
                    <div className="innerText">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>&bull;</strong> On
                      our Privacy Policy Page
                    </div>
                    <div className="innerText">
                      Users are able to change their personal information:
                    </div>
                    <div className="innerText">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>&bull;</strong> By
                      logging in to their account
                    </div>
                    <div className="innerText">
                      <br />
                      <strong>
                        How does our site handle do not track signals?
                      </strong>
                    </div>
                    <div className="innerText">
                      We honor do not track signals and do not track, plant
                      cookies, or use advertising when a Do Not Track (DNT)
                      browser mechanism is in place.
                    </div>
                    <div className="innerText">
                      <br />
                      <strong>
                        Does our site allow third party behavioral tracking?
                      </strong>
                    </div>
                    <div className="innerText">
                      It's also important to note that we do not allow third
                      party behavioral tracking
                    </div>
                    <span id="coppAct" />
                    <br />
                    <div className="blueText">
                      <a id="coppa" />
                      <strong data-magellan-destination="coppa">
                        COPPA (Children Online Privacy Protection Act)
                      </strong>
                    </div>
                    <br />
                    <div className="innerText">
                      When it comes to the collection of personal information
                      from children under 13, the Children’s Online Privacy
                      Protection Act (COPPA) puts parents in control. The
                      Federal Trade Commission, the nation’s consumer protection
                      agency, enforces the COPPA Rule, which spells out what
                      operators of websites and online services must do to
                      protect children’s privacy and safety online.<br />
                      <br />
                    </div>
                    <div className="innerText">
                      We do not specifically market to children under 13.
                    </div>
                    <span id="ftcFip" />
                    <br />
                    <div className="blueText">
                      <a id="fair-info" />
                      <strong data-magellan-destination="fair-info">
                        Fair Information Practices
                      </strong>
                    </div>
                    <br />
                    <div className="innerText">
                      The Fair Information Practices Principles form the
                      backbone of privacy law in the United States and the
                      concepts they include have played a significant role in
                      the development of data protection laws around the globe.
                      Understanding the Fair Information Practice Principles and
                      how they should be implemented is critical to comply with
                      the various privacy laws that protect personal
                      information.<br />
                      <br />
                    </div>
                    <div className="innerText">
                      <strong>
                        In order to be in line with Fair Information Practices
                        we will take the following responsive action, should a
                        data breach occur:
                      </strong>
                    </div>
                    <div className="innerText">
                      We will notify the users via email
                    </div>
                    <div className="innerText">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>&bull;</strong>{' '}
                      Within 7 business days
                    </div>
                    <div className="innerText">
                      We will notify the users via in site notification
                    </div>
                    <div className="innerText">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>&bull;</strong>{' '}
                      Within 7 business days
                    </div>
                    <div className="innerText">
                      <br />We also agree to the individual redress principle,
                      which requires that individuals have a right to pursue
                      legally enforceable rights against data collectors and
                      processors who fail to adhere to the law. This principle
                      requires not only that individuals have enforceable rights
                      against data users, but also that individuals have
                      recourse to courts or a government agency to investigate
                      and/or prosecute non-compliance by data processors.
                    </div>
                    <span id="canSpam" />
                    <br />
                    <div className="blueText">
                      <a id="can-spam" />
                      <strong data-magellan-destination="can-spam">
                        CAN SPAM Act
                      </strong>
                    </div>
                    <br />
                    <div className="innerText">
                      The CAN-SPAM Act is a law that sets the rules for
                      commercial email, establishes requirements for commercial
                      messages, gives recipients the right to have emails
                      stopped from being sent to them, and spells out tough
                      penalties for violations.<br />
                      <br />
                    </div>
                    <div className="innerText">
                      <strong>
                        We collect your email address in order to:
                      </strong>
                    </div>
                    <div className="innerText">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>&bull;</strong>{' '}
                      Send information, respond to inquiries, and/or other
                      requests or questions.
                    </div>
                    <div className="innerText">
                      <br />
                      <strong>
                        To be accordance with CANSPAM we agree to the following:
                      </strong>
                    </div>
                    <div className="innerText">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>&bull;</strong> NOT
                      use false, or misleading subjects or email addresses
                    </div>
                    <div className="innerText">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>&bull;</strong>{' '}
                      Identify the message as an advertisement in some
                      reasonable way
                    </div>
                    <div className="innerText">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>&bull;</strong>{' '}
                      Include the physical address of our business or site
                      headquarters
                    </div>
                    <div className="innerText">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>&bull;</strong>{' '}
                      Monitor third party email marketing services for
                      compliance, if one is used.
                    </div>
                    <div className="innerText">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>&bull;</strong>{' '}
                      Honor opt-out/unsubscribe requests quickly
                    </div>
                    <div className="innerText">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>&bull;</strong>{' '}
                      Allow users to unsubscribe by using the link at the bottom
                      of each email
                    </div>
                    <div className="innerText">
                      <strong>
                        <br />If at any time you would like to unsubscribe from
                        receiving future emails, you can
                      </strong>
                    </div>
                    <div className="innerText">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>&bull;</strong>{' '}
                      Follow the instructions at the bottom of each email.
                    </div>
                    <span id="ourCon" />
                    <br />
                    <div className="blueText">
                      <a id="contact" />
                      <strong data-magellan-destination="contact">
                        Contacting Us
                      </strong>
                    </div>
                    <br />
                    <div className="innerText">
                      If there are any questions regarding this privacy policy
                      you may contact us using the information below.
                      <br />
                      <br />
                    </div>
                    <div className="innerText">www.budgetal.com</div>
                    <div className="innerText">privacy@budgetal.com</div>
                    <div className="innerText">
                      <br />Last Edited on 2016-01-14
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    );
  }
}
