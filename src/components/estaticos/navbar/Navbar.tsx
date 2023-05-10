import './Navbar.css';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { addToken } from '../../../store/tokens/action';

function Navbar() {
  const token = useSelector<TokenState, TokenState["token"]>(
    (state) => state.token
  )
  const history = useNavigate();
  const dispatch = useDispatch();

  function logout() {
    dispatch(addToken(''));
    alert('usuario deslogado com sucesso');
    history('/login');
  }

  let navbarComponent

  if(token !== '' ) {
    navbarComponent = (
<AppBar position="static" style={{ background: 'var(--blue-600)' }}>
        <Toolbar variant="dense">
          <Box display={'flex'} justifyContent={'space-between'} width={'100%'}>
            <Box style={{ cursor: 'pointer' }}>
              <Link to="/home">
                <Typography variant="h5" color="inherit">
                  BlogPessoal
                </Typography>
              </Link>
            </Box>

            <Box display="flex" justifyContent="start">
              <NavLink to="/home" className={({isActive}) => (isActive ? 'taAtivo' : '')}>
                <Box mx={1} style={{ cursor: 'pointer' }}>
                  <Typography variant="h6" color="inherit">
                    home
                  </Typography>
                </Box>
              </NavLink>
              <Box mx={1} style={{ cursor: 'pointer' }}>
                <NavLink to="/postagens" className={({isActive}) => (isActive ? 'taAtivo' : '')}>
                  <Typography variant="h6" color="inherit">
                    postagens
                  </Typography>
                </NavLink>
              </Box>
              <Box mx={1} style={{ cursor: 'pointer' }}>
                <NavLink className={({isActive}) => (isActive ? 'taAtivo' : '')} to="/temas">
                  <Typography variant="h6" color="inherit">
                    temas
                  </Typography>
                </NavLink>
              </Box>
              <Box mx={1} style={{ cursor: 'pointer' }}>
                <NavLink className={({isActive}) => (isActive ? 'taAtivo' : '')} to="/cadastrarTema">
                  <Typography variant="h6" color="inherit">
                    cadastrar tema
                  </Typography>
                </NavLink>
              </Box>
              <Box mx={1} onClick={logout} style={{cursor: 'pointer'}}>
                <Typography variant="h6" color="inherit">
                  logout
                </Typography>
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    )
  }

  return (
    <>
      {navbarComponent}
    </>
  );
}

export default Navbar;