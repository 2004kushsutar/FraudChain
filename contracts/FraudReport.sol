// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FraudReport {
    struct Report {
        string name;
        string aadhaar;
        string pan;
        string description;
    }

    Report[] public reports;
    event ReportFiled(string name, string aadhaar, string pan, string description);

    function fileReport(string memory _name, string memory _aadhaar, string memory _pan, string memory _description) public {
        reports.push(Report(_name, _aadhaar, _pan, _description));
        emit ReportFiled(_name, _aadhaar, _pan, _description);
    }

    function getReport(uint index) public view returns (string memory, string memory, string memory, string memory) {
        Report memory r = reports[index];
        return (r.name, r.aadhaar, r.pan, r.description);
    }

    function totalReports() public view returns (uint) {
        return reports.length;
    }
}
  