import React from "react";

export class FeedbackComponent extends React.Component<any, any> {
  render() {
    return (
      <section className="page-section testimonials-container testimonial--layout-1">
        <div className="container">
          <div className="row">
            <div className="col-md-10 offset-md-1">
              <div className="testimonials">
                <h2 className="page-section__title">25,000+ Happy Clients</h2>
                <div className="swiper-container testimonial-container">
                  <div className="swiper-wrapper testimonial-wrapper">
                    <div className="swiper-slide testimonial">
                      <p className="testimonial-content c-dove-gray">
                        Mitch and I have traveled all over but this was by far
                        one of the best vacations I have been on. Mitch will be
                        writing you about future trips. Make sure Mitch books
                        business class or first class in the future.
                      </p>
                      <div className="testimonial-footer">
                        <div className="testimonial-avatar">
                          <img
                            src="assets/images/uploads/testimonial-avatar.png"
                            className="Client Avatar"
                            alt="Testimonial Image"
                          />
                        </div>
                        <div className="testimonial-client">
                          <span className="testimonial-client-name">
                            - Roberta V
                          </span>
                          <span className="testimonial-client-location">
                            India
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="testimonial-button-container">
                    <span className="ion-chevron-left testimonial-button testimonial-button-left"></span>
                    <span className="ion-chevron-right testimonial-button testimonial-button-right"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default FeedbackComponent;
