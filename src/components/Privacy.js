import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  Divider,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SecurityIcon from '@mui/icons-material/Security';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const Privacy = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Hero Section */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Privacy & Security Policy
        </Typography>
        <Typography variant="h5" component="p" color="text.secondary" sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}>
          At Global Pickups, we prioritize your security, privacy, and peace of mind with transparent policies and robust protection.
        </Typography>
      </Box>

      {/* Main Content */}
      <Grid container spacing={4}>
        {/* Left Column */}
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ color: 'primary.main' }}>
              Package Transparency & Security
            </Typography>
            <Typography paragraph>
              We understand the importance of transparency and security when it comes to package delivery. Our platform is designed with both travelers and senders in mind, ensuring that everyone involved has the necessary information while maintaining appropriate security protocols.
            </Typography>

            <Box sx={{ my: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ color: 'secondary.main', fontWeight: 600 }}>
                Package Content Disclosure
              </Typography>
              <Typography paragraph>
                For safety and security reasons, we require all senders to accurately disclose the contents of their packages. This information is essential for travelers to make informed decisions about what they're carrying.
              </Typography>
              <Typography paragraph>
                Travelers have the right to:
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <VisibilityIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Know exactly what they're carrying" 
                    secondary="Detailed descriptions of all items are provided to travelers before they accept a delivery request"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <VerifiedUserIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Verify package contents" 
                    secondary="Travelers may request to verify the package contents at pickup"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <SecurityIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Decline any package" 
                    secondary="If a traveler is uncomfortable with the package contents for any reason, they may decline the delivery with no penalty"
                  />
                </ListItem>
              </List>
            </Box>

            <Box sx={{ my: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ color: 'secondary.main', fontWeight: 600 }}>
                Prohibited Items
              </Typography>
              <Typography paragraph>
                To ensure the safety and legal compliance of our service, certain items are strictly prohibited from being transported through our platform:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Illegal substances or items" 
                    secondary="Including drugs, weapons, and other contraband"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Hazardous materials" 
                    secondary="Including flammable, explosive, or toxic substances"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Perishable goods" 
                    secondary="Unless specifically agreed upon with appropriate packaging"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Live animals" 
                    secondary="Under no circumstances"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Items requiring special permits" 
                    secondary="Unless all legal documentation is provided and verified"
                  />
                </ListItem>
              </List>
              <Typography paragraph>
                Any attempt to ship prohibited items may result in immediate account termination and possible legal action.
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
            <Typography variant="h5" component="h3" gutterBottom sx={{ color: 'primary.main' }}>
              Frequently Asked Questions
            </Typography>

            <Accordion sx={{ mb: 1 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" fontWeight={500}>
                  What happens if a package is lost?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  If a package is lost, we initiate our claim process immediately. The sender will need to provide details about the package contents and value. Compensation will be based on the level of insurance coverage selected at the time of booking. Our team will work with both the sender and traveler to resolve the situation as quickly as possible.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{ mb: 1 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" fontWeight={500}>
                  Can I send valuable items?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Yes, you can send valuable items, but they must be fully disclosed and appropriately insured. Items valued over $500 require additional insurance, and those over $2,000 need proof of value and premium insurance coverage. We recommend our Gold or Platinum protection plans for valuable items.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{ mb: 1 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" fontWeight={500}>
                  How do I know my package is safe?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Our platform includes multiple safety features, including verified user profiles, secure messaging, and real-time tracking. Additionally, all travelers go through a verification process before being allowed to carry packages. You can also message directly with your traveler through our secure platform to coordinate details and check on your package status.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{ mb: 1 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" fontWeight={500}>
                  What if I'm uncomfortable with a package?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  As a traveler, you have the right to decline any package you're uncomfortable with, no questions asked. You should verify the contents before accepting, and if anything seems suspicious or does not match the description, you can reject the package without penalty. Your safety and peace of mind are our top priorities.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{ mb: 1 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" fontWeight={500}>
                  Is my personal information secure?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Yes, we take data privacy very seriously. We use industry-standard encryption and security measures to protect your personal information. We only share the minimum necessary information between senders and travelers to facilitate successful deliveries. Review our full Privacy Policy for detailed information on how we handle your data.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Paper>

          <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
            <Typography variant="h5" component="h3" gutterBottom sx={{ color: 'primary.main' }}>
              Contact Our Trust & Safety Team
            </Typography>
            <Typography paragraph>
              Have concerns or questions about package safety, insurance, or privacy? Our dedicated Trust & Safety team is here to help.
            </Typography>
            <Typography paragraph>
              <strong>Email:</strong> trust@globalpickups.com<br />
              <strong>Response Time:</strong> Within 24 hours
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              For emergencies or urgent issues with current deliveries, please use the emergency contact option in your delivery details.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Policy Acceptance Section */}
      <Paper elevation={2} sx={{ p: 4, mt: 4, borderRadius: 2, backgroundColor: 'rgba(109, 142, 197, 0.05)' }}>
        <Typography variant="h6" gutterBottom sx={{ color: 'secondary.main' }}>
          Policy Acceptance
        </Typography>
        <Typography paragraph>
          By using our service, both senders and travelers acknowledge that they have read and agree to our privacy, security, and insurance policies. We're committed to maintaining a safe, transparent platform for everyone.
        </Typography>
        <Typography paragraph>
          These policies are regularly updated to reflect the latest best practices in package delivery security and customer protection. Last updated: April 2025.
        </Typography>
      </Paper>
    </Container>
  );
};

export default Privacy;