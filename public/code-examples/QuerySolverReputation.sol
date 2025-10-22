// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// VPNL Registry Interface
interface IVPNLRegistry {
    function isVerified(address solver) external view returns (bool);
}

/**
 * @title Query Solver Reputation
 * @notice Check if a solver has active verification on-chain
 * @dev Real code from VPNL testnet (Arbitrum Sepolia)
 * Contract: 0xD3Acf580A28977D24da7d20364A2F557606d439A
 */
contract SolverReputationQuery {
    IVPNLRegistry public vpnlRegistry;
    
    constructor(address _registry) {
        vpnlRegistry = IVPNLRegistry(_registry);
    }
    
    /**
     * @notice Check if solver is verified before routing
     * @param solver Address to check
     * @return bool Verification status
     */
    function canRouteTo(address solver) public view returns (bool) {
        return vpnlRegistry.isVerified(solver);
    }
    
    /**
     * @notice Batch check multiple solvers
     * @param solvers Array of addresses to check
     * @return verifiedSolvers Array of verified solver addresses
     */
    function getVerifiedSolvers(address[] memory solvers) 
        public 
        view 
        returns (address[] memory verifiedSolvers) 
    {
        uint256 count = 0;
        bool[] memory isVerifiedList = new bool[](solvers.length);
        
        for (uint256 i = 0; i < solvers.length; i++) {
            isVerifiedList[i] = vpnlRegistry.isVerified(solvers[i]);
            if (isVerifiedList[i]) count++;
        }
        
        verifiedSolvers = new address[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < solvers.length; i++) {
            if (isVerifiedList[i]) {
                verifiedSolvers[index] = solvers[i];
                index++;
            }
        }
        
        return verifiedSolvers;
    }
}
