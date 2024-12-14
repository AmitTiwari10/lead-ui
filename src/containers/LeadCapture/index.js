import React from "react";
import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { AddLead } from "../../actions";
import { Layout } from "../../components/Layout";
import { Input, Select } from "../../components/UI/Input";
import { useSelector, useDispatch } from "react-redux";
import "../../assets/css/LeadCapture.css";
import AsyncLocalStorage from "@createnextapp/async-local-storage";

/**
 * @author
 * @function LeadCapture
 **/

export const LeadCapture = (props) => {
  const auth = useSelector((state) => state.auth);
  const _id = auth.user._id;
  const dispatch = useDispatch();
  const [business_name, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("");
  const [contact_person, setContactPerson] = useState("");
  const [contact_email, setEmail] = useState("");
  const [contact_number, setPhone] = useState("");
  const [service_type, setServiceType] = useState("");
  const [service_subtype, setSubType] = useState("");
  const [region, setRegion] = useState("");
  const [notes, setNotes] = useState("");

  const serviceSubTypes = {
    "Fixed Data": ["Fixed - Fibre", "Fixed - LTE"],
    GSM: [
      "GSM - Mobile Data",
      "GSM - Mobile Voice",
      "GSM - Bulk SMS",
      "GSM - SMS & VAS",
      "GSM - Roaming",
      "GSM - Shiriki",
      "GSM - Corporate Value Pack",
      "GSM - Corporate Advantage",
      "GSM - Education Data-Pass",
    ],
    ICT: [
      "ICT - Cloud",
      "ICT - Collocation",
      "ICT - Digital Service",
      "ICT - Managed Security",
      "ICT - Consulting",
      "ICT - G-Suite",
      "ICT - Office 365",
    ],
    MPESA: [
      "MPESA - Buy Goods Till",
      "MPESA - Paybil-C2B",
      "MPESA - Paybill-B2C",
      "MPESA - Paybil-B2B",
    ],
    IoT: [
      "IoT - M-Gas",
      "IoT - Telematics",
      "IoT - Smart-Water",
      "IoT - Smart-Meter",
      "IoT - SIM Management",
    ],
  };
  const createLead = (e) => {
    // e.preventDefault();
    const form = new FormData();
    form.append("_id", _id);
    form.append("business_name", business_name);
    form.append("industry", industry);
    form.append("contact_person", contact_person);
    form.append("contact_email", contact_email);
    form.append("contact_number", contact_number);
    form.append("service_type", service_type);
    form.append("service_subtype", service_subtype);
    form.append("region", region);
    form.append("notes", notes);

    const lead = {
      _id,
      business_name,
      industry,
      contact_person,
      contact_email,
      contact_number,
      service_type,
      service_subtype,
      region,
      notes,
    };
    // console.log(lead);
    if (
      !lead.business_name ||
      !lead.industry ||
      !lead.contact_person ||
      !lead.contact_email ||
      !lead.contact_number ||
      !lead.service_type ||
      !lead.service_subtype ||
      !lead.region ||
      !lead.notes
    ) {
      document.getElementById("msg").innerHTML = "Please fill all fields";
      document.getElementById("msg").classList.add("error");
    } else {
      dispatch(AddLead(lead));
      document.getElementById("msg").innerHTML = "Lead successfully created.";

      document.getElementById("msg").classList.add("success");
      setBusinessName("");
      setIndustry("");
      setContactPerson("");
      setEmail("");
      setPhone("");
      setServiceType("");
      setSubType("");
      setRegion("");
      setNotes("");
    }
  };

  const updateLeadId = async (e) => {
    let post;
    try {
      post = JSON.parse(await AsyncLocalStorage.getItem("postId"));
      // document.getElementById("createdLeadId").innerHTML =
      //   "The Lead Id for the created lead is - " + post;
    } catch (e) {}
    localStorage.removeItem("postId");
  };

  return (
    <Layout>
      <div className="" style={{ borderTop: "1px solid #efefef" }}>
        <h1 style={{ marginLeft: "40px", marginTop: "60px", color: "gray" }}>
          Leads Capture
        </h1>
        {/* <Row className="mb-3">
          <Col className="col-10 text-muted">
            <p
              className="mb-0"
              style={{
                float: "right",
              }}
            >
              Search for leads:
            </p>
          </Col>
          <Col className="col-1">
            <a
              href="/search"
              className="btn-sm"
              variant="success"
              type="btn"
              style={{
                border: "1px solid rgb(194, 189, 189)",
                background: "green",
                borderRadius: "5px",
              }}
            >
              <i className="bi bi-search text-white ms-2"></i>
            </a>
          </Col>
        </Row> */}
        <div
          style={{
            borderTop: "1px solid #efefef",
            margin: "30px 20px 0px 20px",
          }}
        >
          <Form id="form" style={{ marginTop: "50px" }}>
            <Row>
              <Col>
                <Input
                  label="Business Name"
                  class="mb-3 form"
                  id=""
                  placeholder="Enter Business Name"
                  type="text"
                  value={business_name}
                  required
                  onChange={(e) => setBusinessName(e.target.value)}
                />
                <Input
                  label="Contact Person"
                  class="mb-3 form"
                  id=""
                  placeholder="Enter Contact Person"
                  type="text"
                  value={contact_person}
                  required
                  onChange={(e) => setContactPerson(e.target.value)}
                />
                <Form.Label>Region</Form.Label>

                <Form.Select
                  aria-label="Default select example"
                  className="mb-3 form"
                  id=""
                  style={{ fontSize: "12px" }}
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  required
                >
                  <option>Select Region</option>
                  <option value="NAIROBI">NAIROBI</option>
                  <option value="MOUNTAIN">MOUNTAIN</option>
                  <option value="COAST">COAST</option>
                  <option value="RIFT">RIFT</option>
                  <option value="GREATER WESTERN">GREATER WESTERN</option>
                </Form.Select>
                <Button
                  className="btn-sm"
                  variant="success"
                  type="submit"
                  style={{ width: "160px" }}
                  onClick={(e) => {
                    e.preventDefault();
                    createLead();
                    setTimeout(() => {
                      updateLeadId();
                    }, 1000);
                  }}
                >
                  Submit
                </Button>
              </Col>
              <Col>
                <Input
                  label="Industry"
                  class="mb-3 form"
                  id=""
                  placeholder="Enter Industry"
                  type="text"
                  value={industry}
                  required
                  onChange={(e) => setIndustry(e.target.value)}
                />
                <Input
                  label="Contact Email"
                  class="mb-3 form"
                  id=""
                  placeholder="Enter Contact Email address"
                  type="email"
                  value={contact_email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Row>
                  <Col>
                    <Form.Group controlId="serviceType">
                      <Form.Label>Service Type</Form.Label>
                      <Form.Select
                        aria-label="Select Service Type"
                        className="form"
                        style={{ fontSize: "12px" }}
                        value={service_type}
                        onChange={(e) => {
                          setServiceType(e.target.value);
                          setSubType(""); // Reset subtype when type changes
                        }}
                        required
                      >
                        <option value="">Select Service</option>
                        {Object.keys(serviceSubTypes).map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="serviceSubType">
                      <Form.Label>Service Sub-Type</Form.Label>
                      <Form.Select
                        aria-label="Select Service Sub-Type"
                        className="form"
                        style={{ fontSize: "12px" }}
                        value={service_subtype}
                        onChange={(e) => setSubType(e.target.value)}
                        required
                        disabled={!service_type} // Disable if no type is selected
                      >
                        <option value="">Select Sub-Type</option>
                        {service_type &&
                          serviceSubTypes[service_type].map((subtype) => (
                            <option key={subtype} value={subtype}>
                              {subtype}
                            </option>
                          ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
              <Col>
                <Input
                  label="Contact Phone"
                  class="mb-3 form"
                  id=""
                  placeholder="Enter Contact number"
                  type="text"
                  value={contact_number}
                  required
                  onChange={(e) => setPhone(e.target.value)}
                />
                <Input
                  label="Additionl Notes"
                  as="textarea"
                  rows="5"
                  class="mb-3 form"
                  id=""
                  placeholder="Enter Notes"
                  type="text"
                  value={notes}
                  required
                  onChange={(e) => setNotes(e.target.value)}
                />
              </Col>
            </Row>
          </Form>
          <p className="mt-3 text-center" id="msg"></p>
          <p
            className="mt-3 text-center text-info"
            id="createdLeadId"
            style={{ fontWeight: "bold" }}
          ></p>
        </div>
      </div>
    </Layout>
  );
};
