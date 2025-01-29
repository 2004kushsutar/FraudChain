pragma solidity ^0.8.0;

contract UserStorage {
    struct User {
        string name;
        uint256 age;
    }
    User[] public users;

    function addUser(string memory _name, uint256 _age) public {
        users.push(User(_name, _age));
    }
    function getUser(uint256 index) public view returns (string memory, uint256) {
        require(index < users.length, "User does not exist.");
        User memory user = users[index];
        return (user.name, user.age);
    }
    function getTotalUsers() public view returns (uint256) {
        return users.length;
    }
}